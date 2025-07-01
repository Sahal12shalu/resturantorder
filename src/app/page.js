import Frontpage from "./frontpage/page";
import Server from '../../client/api/route'

export default function Home() {
  return (
    <>
    <Server></Server>
    <Frontpage />
    </>
  );
}
