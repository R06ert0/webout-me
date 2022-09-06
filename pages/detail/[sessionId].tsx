import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

interface iImages {
  [key: string]: string;
}
const images: iImages = {
  google: "/Images/google.png",
  netflix: "/Images/netflix.png",
  pubg: "/Images/pubg.png",
  spotify: "/Images/spotify.png",
  youtube: "/Images/youtube.png",
  starbucks: "/Images/starbucks.png",
};

interface iDetail {
  sessionId: string;
}

const Detail: NextPage<iDetail> = ({ sessionId }) => {
  const [text, setText] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const { query } = useRouter();
  const { name } = query || {};

  useEffect(() => {
    const el = document.getElementById(sessionId);
    if (el) {
      // @ts-ignore
      el.data = {
        project: {
          TEXT_0: text,
          TEXT_DUBAI: text,
          CUSTOMER_NAME: text,
          IMAGE_0: imgSrc,
          IMAGE_LETENKA: imgSrc,
        },
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgSrc, text]);

  function handleChange(e: any) {
    const { value } = e.target || "";
    setText(value);
  }

  function handleImageClick(imgKey: string) {
    setImgSrc(images[imgKey]);
  }

  return (
    <div className="detail-wrapper">
      <div className="controls-wrapper">
        <Link href={"/"}>
          <Button className="back-button" variant="primary">
            <FaArrowLeft />
            Zpět
          </Button>
        </Link>
        <h1>{name}</h1>
      </div>
      <div className="player-wrapper">
        <webout-player id={sessionId} sessionId={sessionId}></webout-player>
        <div className="inputs-wrapper">
          <h5>Zadat text do přehrávače...</h5>
          <Form.Control onChange={handleChange} value={text} />
          <h5>Vybrat obrázek do přehrávače...</h5>
          <div className="image-inputs-wrapper">
            {Object.keys(images).map((imgKey) => (
              <div
                onClick={() => {
                  handleImageClick(imgKey);
                }}
                className="image-input-wrapper"
                key={imgKey}
              >
                <Image alt={imgKey} src={images[imgKey]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}

export async function getStaticProps({ params }: any) {
  const { sessionId } = params || {};

  return {
    props: { sessionId },
  };
}
