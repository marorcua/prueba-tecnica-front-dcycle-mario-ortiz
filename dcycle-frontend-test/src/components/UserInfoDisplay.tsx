import { UserInfo } from '../types';

export const UserInfoDisplay = ({ userInfo }: { userInfo: UserInfo }) => {
  const { ageData, genderData, nationalitiesData } = userInfo;

  return (
    <div className="rounded border p-4">
      <h2 className="text-xl font-bold">Resultados para {userInfo.name}</h2>
      {genderData?.gender && (
        <p>
          <strong>Género:</strong> {genderData.gender} (
          {(genderData?.probability * 100).toFixed(2)}%)
        </p>
      )}
      {ageData && (
        <p>
          <strong>Edad más probable:</strong> {ageData.age}
        </p>
      )}
      {nationalitiesData && nationalitiesData.country.length > 0 && (
        <div>
          <strong>Nacionalidades probables:</strong>
          <ul>
            {nationalitiesData.country.map((country) => (
              <li key={country.country_id}>
                <img
                  src={`https://flagsapi.com/${country.country_id}/flat/32.png`}
                  alt={country.country_id}
                  className="mr-2 inline-block h-5 w-8"
                />
                {country.country_id} ({(country.probability * 100).toFixed(2)}
                %)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
