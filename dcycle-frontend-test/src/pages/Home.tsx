import { Link } from 'react-router-dom';
import { GraphIcon, IdentityIcon } from '../components/icons';

function Home() {
  return (
    <section className="flex h-[100%] flex-wrap items-center justify-around">
      <Link
        to={'/user-info'}
        className="m-8 h-fit w-80 rounded-2xl border-1 border-white bg-gray-700 px-6 py-8 text-center text-white transition-colors duration-500 hover:bg-gray-500"
      >
        <IdentityIcon />

        <h2>Ejercicio 1 - Información nombre</h2>
      </Link>
      <Link
        to={'/covid-dashboard'}
        className="m-8 h-fit w-80 rounded-2xl border-1 border-white bg-gray-700 px-6 py-8 text-center text-white transition-colors duration-500 hover:bg-gray-500"
      >
        <GraphIcon />
        <h2>Ejercicio 2 - Covid Dashboard</h2>
      </Link>
    </section>
  );
}

export default Home;
