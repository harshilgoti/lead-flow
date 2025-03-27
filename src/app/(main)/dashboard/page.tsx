import { getLeadTypePercentage } from "@/server/actions/leads";
import Highchart from "./_components/Highchart";

const Page = async () => {
  const data = await getLeadTypePercentage();

  const hotLeadData = [
    { name: "HOT", y: data["HOT"] ? +data["HOT"] : 0 },
    { name: "Other", y: 100 - (data["HOT"] ? +data["HOT"] : 0) },
  ];
  const warmLeadData = [
    { name: "WARM", y: data["WARM"] ? +data["WARM"] : 0 },
    { name: "Other", y: 100 - (data["WARM"] ? +data["WARM"] : 0) },
  ];
  const holdLeadData = [
    { name: "HOLD", y: data["HOLD"] ? +data["HOLD"] : 0 },
    { name: "Other", y: 100 - (data["HOLD"] ? +data["HOLD"] : 0) },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50">
          <Highchart type="pie" title="HOT" data={hotLeadData} />
        </div>
        <div className="aspect-video rounded-xl bg-muted/50">
          <Highchart type="pie" title="WARM" data={warmLeadData} />
        </div>
        <div className="aspect-video rounded-xl bg-muted/50">
          <Highchart type="pie" title="HOLD" data={holdLeadData} />
        </div>
      </div>
    </div>
  );
};

export default Page;
