import React from 'react'
import { RowItem } from './RowItem'

export const RenderItemMovie = ({item}) => {
  const imgUrl = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`
  return (
    <RowItem
      onPress={() => console.log(item.title)}
      imageUrl={imgUrl}
      title={item.title}
      releaseDate={item.release_date}
      rating={item.vote_average}
    />
  )
}
export const RenderItemTV = ({item}) => {
  const imgUrl = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`
  return (
    <RowItem
      imageUrl={imgUrl}
      title={item.name}
      releaseDate={item.first_air_date}
      rating={item.vote_average}
    />
  )
}