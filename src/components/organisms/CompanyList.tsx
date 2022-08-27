import { useGetCompanies } from "api/companies/companies";

function CompapyList() {
  const { data } = useGetCompanies();
  return (
    <ul>
      {data?.map((company) => {
        return <li key={company.id}>{company.name}</li>;
      })}
    </ul>
  );
}

export default CompapyList;
