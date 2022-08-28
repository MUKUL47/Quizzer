import { User } from 'src/database/entities';

interface JwtResponse {
  accessToken: string;
}
interface PaginatedResponse<order> {
  orderBy?: order;
  sort?: 'DESC' | 'ASC';
  limit?: number;
  skip?: number;
}

interface UserParams<T> {
  user: User;
  data: T;
}

interface UpdatePayload<T> {
  id?: number;
  payload: T;
  user: User;
}
export { JwtResponse, PaginatedResponse, UserParams, UpdatePayload };
