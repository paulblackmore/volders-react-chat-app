import { useForm, SubmitHandler } from 'react-hook-form';
import { StyledButton } from '../components/StyledButton';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import { useParams } from 'react-router-dom';
import { useFetchMessagesBySessionId } from '../hooks/useFetchMessagesBySessionId';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { EmptyChatHistory } from '../components/EmptyChatHistory';
import { MessageFromApi } from '../types/message';
import { useCreateMessage } from '../hooks';
import { v4 as uuidv4 } from 'uuid';

type FormInputs = {
  text: string;
};

const messageSchema = z
  .object({
    text: z.string().min(1, { message: 'Text can not be empty' }),
  })
  .strict();

const MessageItem = ({ message }: { message: MessageFromApi }) => (
  <div className='flex flex-col justify-center items-center bg-slate-500 rounded-lg p-4 w-3/4 gap-4'>
    <p>{message.text}</p>
    <footer className='flex justify-between w-full'>
      <span className='text-sm'>{message.timestamp}</span>
      <span className='text-sm'>Sent</span>
    </footer>
  </div>
);

const MessageForm = () => {
  const { sessionId } = useParams();
  const createMessage = useCreateMessage(sessionId || '');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: '',
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = ({ text }) => {
    if (sessionId) {
      createMessage.mutate({
        sessionId,
        message: {
          id: uuidv4(),
          text,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorMessage errors={errors} name='text' />
      <label
        htmlFor='message'
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      />
      <input
        id='message'
        className='block p-2.5 w-full mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='Write your thoughts here...'
        {...register('text', { required: true })}
      />
      <StyledButton type='submit'>Send</StyledButton>
    </form>
  );
};

export const ChatSession = () => {
  const { sessionId } = useParams();
  const {
    data: messages,
    isLoading,
    isError,
    isRefetching,
  } = useFetchMessagesBySessionId(sessionId || '');

  return isLoading || isRefetching ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <div className='flex flex-col justify-center items-center gap-4 h-screen'>
      <div className='flex flex-col gap-4 justify-start items-center h-screen w-full mt-4'>
        {messages?.length ? (
          messages.map((message: MessageFromApi) => (
            <MessageItem key={message.id} message={message} />
          ))
        ) : (
          <EmptyChatHistory />
        )}
      </div>
      <footer className='fixed bottom-0 w-2/4 mb-4'>
        <MessageForm />
      </footer>
    </div>
  );
};
