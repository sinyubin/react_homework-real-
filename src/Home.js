import React, { useState, useEffect } from "react";
import styled from "style-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import Start from "./Start";
import { RoundBtn } from "./Btn";
import { loadMoreNemosFB } from "./redux/modules/Nemo";
import { async } from "@firebase/util";

const Home = () => {
  const nemos = useSelector((state) => state.nemos.nemo_list);
  const lastValue = useSelector((state) => state.nemos.lastValue);
  const dispatch = useDispatch();

  const [target, setTarget] = useState(null);

  useEffect(() => {
    let options = {
      threshold: "1",
    };

    let handleIntersection = async ([entries], observer) => {
      if (!entries.isIntersecting) {
        return;
      } else {
        await dispatch(loadMoreNemosFB(lastValue));
        observer.unobserve(entries.target);
      }
    };

    const io = new IntersectionObserver(handleIntersection, options);
    if (target) io.observe(target);

    return () => io && io.disconnect();
  }, [target]);

  return (
    <div>
      <Cards>
        {nemos.map((nemo, idx) => {
          const lastItem = idx === nemos.length - 1;
          return (
            <Start
              key={nemo.id}
              word_obj={nemo}
              ref={lastItem ? setTarget : null}
            />
          );
        })}
      </Cards>
      <AddBtn to="/nemo/add">
        <Plus />
      </AddBtn>
    </div>
  );
};

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  padding: 50px 0;
`;

const Plus = styled(TiPlus)`
  font-size: 28px;
`;

const AddBtn = styled(Link)`
  ${RoundBtn};
  position: fixed;
  bottom: 10px;
  right: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  ${({ theme }) => theme.device.tablet} {
    bottom: 20px;
    right: 20px;
  }
  ${Plus} {
    transition: transform 300ms ease-in-out;
  }
  &:hover {
    ${Plus} {
      transform: rotate(90deg);
    }
  }
`;

export default Home;
