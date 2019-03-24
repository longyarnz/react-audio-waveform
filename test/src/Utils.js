import React from 'react';

export function ShouldRender(props) {
  return props.if ? props.children : null;
}