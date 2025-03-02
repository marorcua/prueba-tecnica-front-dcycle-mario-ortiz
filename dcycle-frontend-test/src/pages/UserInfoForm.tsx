import { useActionState, useState } from 'react';
import { UserInfoDisplay } from '../components/UserInfoDisplay';
import { UserInfo } from '../types';
import { fetchUserInfo } from '../services/fetchData';
import { Spinner } from '../components/Spinner';
import { useFormStatus } from 'react-dom';
import { Toast } from '../components/Toast';
import { handleErrorMessage } from '../lib';

export const UserInfoForm = () => {
  const [name, setName] = useState('');
  const [userInfo, formAction] = useActionState(submitAction, { name: '' });

  async function submitAction(prevState: UserInfo | null, formData: FormData) {
    const name = formData.get('name') as string;
    const response = await fetchUserInfo(name);
    if (Object.values(response).some((info) => info === undefined)) {
      response.error =
        'Error obteniendo infromación de: ' + handleErrorMessage(response);
    }
    return response;
  }

  return (
    <section className="mx-auto h-fit w-md rounded-lg bg-gray-900 p-6 text-white shadow-md transition-all delay-200">
      <form action={formAction}>
        <input
          type="text"
          name="name"
          className="w-full rounded border p-2"
          placeholder="Introduce tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <SubmitButton />
      </form>

      {userInfo.name && <UserInfoDisplay userInfo={userInfo} />}
      {userInfo.error && <Toast message={userInfo.error} />}
    </section>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="hover:animate-jump my-6 flex w-[100%] items-center justify-center gap-2 rounded-lg bg-gray-300 p-2 px-6 py-3 text-black shadow-md transition-all duration-300 hover:bg-gray-200"
    >
      {pending && <Spinner />}
      {pending ? 'Cargando...' : 'Consultar'}
    </button>
  );
}
