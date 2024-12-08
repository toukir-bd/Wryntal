
import "../../app/tailwind.scss";

const GlobalLoading = () => {
  return (
    <div className="flex items-center justify-center h-[90vh] w-full">
      <div className="relative w-[50px] h-[50px] rounded-full isolate animy">
        <div className="absolute top-[50%] w-[10px] h-[10px] rounded-[24px] bg-[#FE705C] left-0 anitop"></div>
        <div className="absolute top-[50%] w-[10px] h-[10px] rounded-[24px] bg-[#2A2A49] left-[50%] anitop animid"></div>
        <div className="absolute top-[50%] w-[10px] h-[10px] rounded-[24px] bg-[#0095FE] right-0 anitop"></div>
      </div>
    </div>
  );
};

export default GlobalLoading;
