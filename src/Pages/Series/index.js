import React, { useState, useEffect } from "react";
import * as S from "./style";

export default function Series() {
  const [series, setSeries] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=b3c62dbbf7ef4ecdea1a16d5806b193a&language=pt-BR&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setSeries(data.results);
      });
  }, []);

  const [search, setSearch] = useState("");
  const seriesFilter = series.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <S.Container>
      <S.FilterBox>
        <S.Label>
          <S.Span>|</S.Span>Busque pela sua série aqui:
        </S.Label>
        <S.Search
          placeholder="Digite o seu filme..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
        />
      </S.FilterBox>
      <S.Box>
        {seriesFilter.map((item) => (
          <S.MovieBox key={item.id}>
            <S.Poster
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={`Poster do filme ${item.name}`}
              title={`Poster do filme ${item.name}`}
            />
            <div>
              <S.Title>
                <S.Span>|</S.Span>
                {item.name}
              </S.Title>
              <S.Overview>{item.overview}</S.Overview>
              <S.InfoBox>
                <S.Info>
                  Data de lançamento:{" "}
                  <S.InfoSpan>{item.first_air_date}</S.InfoSpan>
                </S.Info>
                <S.Info>
                  Nota: <S.InfoSpan>{item.vote_average}</S.InfoSpan>
                </S.Info>
              </S.InfoBox>
            </div>
          </S.MovieBox>
        ))}
      </S.Box>
    </S.Container>
  );
}
