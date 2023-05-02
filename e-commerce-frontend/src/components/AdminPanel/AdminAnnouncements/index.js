import { useDispatch, useSelector } from "react-redux";
import {
  emptyAnnouncements,
  getAllAnnouncements,
  selectAllAnnouncements,
  selectAnnouncementsLoading,
} from "../../../features/announcements/announcementsSlice";
import Announcement from "./Announcement";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { SpinnerContainer } from "../AdminProducts/ProductsAdmin";
import Spinner from "../../Spinner";
import NewAnnouncement from "./NewAnnouncement";
import Filters from "./Filters";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: start;
  gap: 20px;
  margin: 10px;
  transition: all 0.3s;
  min-height: 500px;
`;

function AdminAnnouncements() {
  const announcements = useSelector(selectAllAnnouncements);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [query, setQuery] = useState("");
  const loading = useSelector(selectAnnouncementsLoading);
  const dispatch = useDispatch();

  const sorts = useMemo(
    () => ({
      newest: ["updatedAt,DESC"],
      oldest: ["updatedAt,ASC"],
    }),
    []
  );

  useEffect(() => {
    if (sort || search) {
      dispatch(emptyAnnouncements());
      setQuery(
        `?dummy=0${search ? `&search=${search}` : ""}${
          sort ? `&order=${sorts[sort]}` : ""
        }`
      );
    }
  }, [sort, search, sorts, dispatch]);

  useEffect(() => {
    if (query) {
      dispatch(getAllAnnouncements(query));
    }
  }, [query, dispatch]);

  useEffect(() => {
    return () => window.scroll({ top: 0, left: 0 });
  }, []);

  return (
    <Container>
      <Filters
        search={search}
        setSearch={setSearch}
        setSort={setSort}
        sorts={sorts}
      />
      <NewAnnouncement />
      {announcements.map((a) => (
        <Announcement key={a.id} a={a} />
      ))}
      <SpinnerContainer>{loading && <Spinner />}</SpinnerContainer>
    </Container>
  );
}

export default AdminAnnouncements;
