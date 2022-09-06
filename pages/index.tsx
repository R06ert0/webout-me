import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export interface iPlayer {
  sessionId: string;
  name: string;
  description: string;
  thumbnail: string;
}

interface iHome {
  players: Array<iPlayer>;
}

interface iHomeOptions {
  name: string;
}

const Home: NextPage<iHome> = ({ players }) => {
  const [searchedPhrase, setSearchedPhrase] = useState<string>("");
  const [playersToShow, setPlayersToShow] = useState<Array<iPlayer>>(players);

  useEffect(() => {
    setPlayersToShow(
      players.filter((player) =>
        player.name.toLowerCase().includes(searchedPhrase.trim().toLowerCase())
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedPhrase]);

  function handleChange(e: any) {
    const { value } = e.target || "";
    setSearchedPhrase(value);
  }

  return (
    <>
      <Form.Control
        className="search-box"
        placeholder="Vyhledat přehrávač..."
        onChange={handleChange}
        value={searchedPhrase}
      />
      <Row fluid className="card-wrapper">
        {playersToShow?.map((player: iPlayer) => {
          return (
            <Col
              className="card-column"
              xs={12}
              md={6}
              lg={4}
              xl={3}
              key={player.name}
            >
              <Card key={player.name} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={player.thumbnail} />
                <Card.Body>
                  <Card.Title>{player.name}</Card.Title>
                  <Card.Text>{player.description}</Card.Text>
                  <Link
                    href={
                      "/detail/" + player.sessionId + "?name=" + player.name
                    }
                  >
                    <Button variant="primary">Detail</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        <div className="equalizer"></div>
      </Row>
    </>
  );
};
export default Home;

export const getStaticProps = async () => {
  const res = await fetch("https://cdn.webout.me/data/projects.json");
  const data = await res.json();
  return {
    props: { players: data },
  };
};
