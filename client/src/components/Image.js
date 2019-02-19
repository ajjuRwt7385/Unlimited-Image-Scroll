import React from 'react';

export default function Image({src}) {
  return (
    <img className="single-photo" src={src.urls.thumb} alt={src.description} />
  )
}
