import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StyledButton } from '../../components/StyledButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import { useParams } from 'react-router-dom';
import { useCreateMessage } from '../../hooks';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

type Input = {
  text: string;
};

const messageSchema = z
  .object({
    text: z.string().min(1, { message: 'Text can not be empty' }),
  })
  .strict();

const MessageApiFailure = () => (
  <p className='text-red-500'>
    Error while sending message, click send to retry
  </p>
);

export const MessageForm = () => {
  const { sessionId } = useParams();
  const { mutate, isError, status, variables } = useCreateMessage(
    sessionId || ''
  );
  const borderColor = isError ? 'border-red-600' : 'border-gray-600';
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

  useEffect(() => {
    // reset form with previous value if mutation fails
    if (isError) {
      reset({ text: variables.message.text });
    }
  }, [isError, variables, reset]);

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
    reset({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError ? <MessageApiFailure /> : null}
      <ErrorMessage errors={errors} name='text' />
      <label htmlFor='message' />
      <input
        id='message'
        className={`block p-2.5 w-full mb-4 text-sm rounded-lg border bg-gray-700 ${borderColor}  placeholder-gray-400 text-white`}
        placeholder='Write your thoughts here...'
        {...register('text', { required: true })}
      />
      <StyledButton type='submit' disabled={status === 'pending'}>
        Send
      </StyledButton>
    </form>
  );
};
