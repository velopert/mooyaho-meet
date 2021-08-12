import { useParams } from "react-router";

function Meet() {
  const params = useParams();
  return <div>Meet {params.slug}</div>;
}

export default Meet;
