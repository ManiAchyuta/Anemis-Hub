import { Badge } from "@material-ui/core";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  id,
  poster,
  title,
  data,
  media_type,
  vote_average,
}) => {
  return (
    
    <ContentModal media_type={media_type} data={data}>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {console.log("Test-->"+ media_type)}
        {media_type === "TV" ? "TV Series" : "Movie"}
        {/* <span className="subTitle">{date}</span> */}
      </span>
    </ContentModal>
  );
};

export default SingleContent;
