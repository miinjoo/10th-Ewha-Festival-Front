import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

import { PyeongChang_Peace, Pretendard } from "../Text";
import Footer from "../Footer/Footer";
import { boothData } from "../../_mock/boothData";
import { useNavigate } from "react-router-dom";

import { http } from "../../api/http";

import Logout from "./Logout";
import Navbar from "./Navbar";

import greenheart from "../../images/greenheart.svg";
import likebooth from "../../images/mypage/likebooth.svg";
import Mstar from "../../images/mypage/Mstar.svg";
import userbg from "../../images/mypage/userbg.svg";
import edit1 from "../../images/mypage/edit1.png";
import edit2 from "../../images/mypage/edit2.png";
import booththumnail from "../../images/default.png";

import { GetLikes } from "../../api/user";

const MyManager = () => {
  const [booths, setBooths] = useState(boothData);
  const [likebooths, setLikebooths] = useState(0);
  const [nickname, setnickname] = useState();
  const [username, setusername] = useState();
  const navigate = useNavigate();

  const goEditbooth = () => {
    navigate("/editbooth");
  };
  const goEditMenu = () => {
    navigate("/editmenu");
  };
  const Detail = id => {
    navigate(`/category/detail/${id}`);
  };
  useEffect(() => {
    http
      .get("/accounts/")
      .then(res => {
        console.log("[로그인 유저]\n", res.data.data);
        setnickname(res.data.data.nickname);
        setusername(res.data.data.username);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    GetLikes(localStorage.getItem("token").slice(1, -1))
      .then(res => {
        console.log("좋아요한 부스 조회 성공", res);
        setBooths(res.data.data);
        setLikebooths(res.data.data.length);
      })
      .catch(err => {
        console.log("좋아요한 부스 조회 실패", err);
      });
  }, []);
  const wrapperRef = useRef(null);
  return (
    <Wrapper>
      <Navbar />
      <Userbox>
        <object className="Mstar" data={Mstar} type="image/svg+xml" />
        <p className="nickname">
          <Pretendard>{nickname}</Pretendard>
        </p>
        <p className="user">
          <Pretendard>{username}</Pretendard>
        </p>
        <p className="manager">
          <Pretendard>부스관리자</Pretendard>
        </p>
        <object className="star" data={likebooth} type="image/svg+xml" />
      </Userbox>
      <EditBooth>
        <div id="edit1" onClick={goEditbooth}>
          <Pretendard>내 부스 정보 수정</Pretendard>
        </div>
        <div id="edit2" onClick={goEditMenu}>
          <Pretendard>메뉴 정보 수정</Pretendard>
        </div>
      </EditBooth>
      <BoothBox>
        <Titlebox>
          <object data={likebooth} type="image/svg+xml" />
          <PyeongChang_Peace
            color="var(--green3)"
            weight="300"
            size="16px"
            style={{ display: "flex" }}
          >
            좋아요한 부스 ({likebooths})
          </PyeongChang_Peace>
        </Titlebox>
        {booths?.map(b => {
          const description = b.description?.substr(0, 27);
          if (description?.includes("\n")) {
            var info = description.split("\n")[0];
          } else {
            var info = description;
          }

          return (
            <Booth key={b.id} onClick={event => Detail(b.id)}>
              {b.thumnail == "" ? (
                <LikeImg src={booththumnail} />
              ) : (
                <LikeImg src={b.thumnail} />
              )}
              <BootInfo>
                <p className="num">{b.number}</p>
                <p className="name">{b.name.substr(0, 13)}</p>
                <p className="info">{info}</p>
              </BootInfo>
              <Heart
                src={greenheart}
                onClick={() => unLike(b.id)}
                ref={wrapperRef}
              />
            </Booth>
          );
        })}
      </BoothBox>
      <Logout />
      <Footer />
    </Wrapper>
  );
};

export default MyManager;

const Heart = styled.img`
  position: absolute;
  top: 16px;
  right: 14px;
`;

const LikeImg = styled.img`
  background-color: #f6f6f6;
  margin-right: 12px;
  width: 89px;
  height: 90px;
  border-radius: 10px 0 0 10px;
  border: none;
`;

const BootInfo = styled.div`
  width: 176px;

  padding: 12px 0 12px 0;
  .num {
    font-size: 10px;
    font-style: "Pretendard-Regular";
    font-weight: 400;
    color: var(--orange);
  }

  .name {
    font-size: 15px;
    font-style: "Pretendard-Regular";
    font-weight: 700;
    color: var(--green3);
  }

  .info {
    font-size: 11px;
    font-style: "Pretendard-Regular";
    font-weight: 400;
    line-height: 16px;
    color: var(--black);
  }
`;

const Booth = styled.div`
  margin-top: 16px;
  position: relative;
  display: flex;
  width: 335px;
  height: 90px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.075);
`;

const BoothBox = styled.div`
  margin: 0 auto 50px auto;
  width: 335px;
  height: 100%;

  display: flex;
  flex-direction: column;

  padding-top: 26px;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Titlebox = styled.div`
  border-bottom: 1px solid var(--gray);
  display: flex;
  object {
    width: 17px;
    height: 28px;
    margin-bottom: 7px;
    margin-right: 7px;
    display: block;
  }
`;

const Userbox = styled.object`
  background-image: url(${userbg});
  width: 268px;
  height: 105px;
  margin: 33px auto;
  background-repeat: no-repeat;
  text-align: center;
  position: relative;
  .star {
    position: absolute;
    top: 55px;
    left: 250px;
  }
  .Mstar {
    position: absolute;
    top: 8px;
    left: 6px;
  }
  .nickname {
    margin: 23px auto 2px;
    color: #686868;
    font-weight: 700;
    font-size: 25px;
  }
  .user {
    font-weight: 500;
    font-size: 14px;
    color: var(--green1);
    width: fit-content;
    margin: 0 auto 2px;
  }
  .manager {
    width: fit-content;
    margin: 4px auto 2px;
    font-weight: 500;
    font-size: 14px;
    color: var(--orange);
  }
`;
const EditBooth = styled.div`
  width: fit-content;
  margin: 0 auto;
  div {
    display: block;
    margin: 12px auto 0;
    width: 335px;
    height: 43px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #004628;
    padding-left: 50px;
    padding-top: 12px;
  }
  #edit1 {
    background-image: url(${edit1});
  }
  #edit2 {
    background-image: url(${edit2});
  }
  div:active {
    box-shadow: inset 0px 2px 6px #bbc4c0;
    border-radius: 8px;
    cursor: pointer;
  }
`;
