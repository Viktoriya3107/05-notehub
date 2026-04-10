import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import type{ NoteTag } from '../../types/note';

interface NoteFormProps {
  onClose: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const schema = Yup.object({
  title: Yup.string().min(3).max(50).required('Required'),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Required'),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik<NoteFormValues>
      initialValues={{
        title: '',
        content: '',
        tag: 'Todo',
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        mutation.mutate(values); 
      }}
    >
      <Form>
        <div>
          <Field name="title" placeholder="Title" />
          <ErrorMessage name="title" />
        </div>

        <div>
          <Field as="textarea" name="content" />
          <ErrorMessage name="content" />
        </div>

        <div>
          <Field as="select" name="tag">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" />
        </div>

        <button type="button" onClick={onClose}>
          Cancel
        </button>

        <button type="submit" disabled={mutation.isPending}>
          Create note
        </button>
      </Form>
    </Formik>
  );
}