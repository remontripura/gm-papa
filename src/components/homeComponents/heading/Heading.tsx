import MainContainer from "@/components/container/MainContainer";
import { getData } from "@/lib/fetch/getData";
import { NoticeResponse } from "@/types/notice/noticeType";

const Heading = async () => {
  const notice = await getData<NoticeResponse>("/notice", {
    next: { revalidate: 60 },
  });
  return (
    <div className="w-full py-2 bg-gray-800 overflow-hidden text-white px-3">
      <MainContainer>
        <div className="marquee-wrapper">
          {notice.data.map((item) => (
            <div key={item.id} className="marquee-content">
              {item.notice}
            </div>
          ))}
        </div>
      </MainContainer>
    </div>
  );
};

export default Heading;
