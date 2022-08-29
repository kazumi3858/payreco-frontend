import { useGetCompanies } from "api/companies/companies";
import { Company, Work } from "api/model";
import FormModal from "components/molecules/FormModal";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";
import DetailedSchedule from "./DetailedSchedule";

type Props = {
  selectedDay: Date;
  selectedDayWorks?: Work[];
};

function ScheduleList({ selectedDay, selectedDayWorks }: Props) {
  const { data } = useGetCompanies();
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);
  return (
    <section className="mt-12 md:mt-0 md:pl-14">
      <span className="font-semibold text-gray-900">
        <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
          {format(selectedDay, "MMM dd日", { locale: ja })}
        </time>
        の予定
      </span>
      <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
        {selectedDayWorks && selectedDayWorks.length > 0 ? (
          selectedDayWorks.map((work) => (
            <DetailedSchedule
              selectedDay={selectedDay}
              work={work}
              key={work.id}
            />
          ))
        ) : (
          <p>予定はありません。</p>
        )}
      </ol>
      <p>勤務先を選んで予定を追加</p>
      {data?.map((company) => {
        return (
          <button
            className="m-1 bg-stone-200"
            key={company.id}
            onClick={() => {
              setSelectedCompany(company);
            }}
          >
            {company.name}
          </button>
        );
      })}
      {selectedCompany && (
        <FormModal
          selectedDay={selectedDay}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
        />
      )}
    </section>
  );
}

export default ScheduleList;
