import axios from 'axios';
import type{ Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.headers.common.Authorization = `Bearer ${token}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string
): Promise<FetchNotesResponse> => {
  const res = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    params: {
      page,
      perPage: 12,
      search,
    },
  });

  return res.data;
};

export const createNote = async (
  note: {
    title: string;
    content: string;
    tag: Note['tag']; 
  }
): Promise<Note> => {
  const res = await axios.post<Note>(`${BASE_URL}/notes`, note);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`${BASE_URL}/notes/${id}`);
  return res.data;
};