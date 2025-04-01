import { useForm, SubmitHandler } from 'react-hook-form';
import { StyledButton } from '../../components/StyledButton';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import { useParams } from 'react-router-dom';
import { useCreateMessage } from '../../hooks';
import { v4 as uuidv4 } from 'uuid';

type Input = {
  text: string;
};

const messageSchema = z
  .object({
    text: z.string().min(1, { message: 'Text can not be empty' }),
  })
  .strict();

export const MessageForm = () => {
  const { sessionId } = useParams();
  const { mutate } = useCreateMessage(sessionId || '');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: '',
    },
  });

  const onSubmit: SubmitHandler<Input> = ({ text }) => {
    if (sessionId) {
      mutate({
        sessionId,
        message: {
          id: uuidv4(),
          text,
        },
      });
    }
    reset();
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
