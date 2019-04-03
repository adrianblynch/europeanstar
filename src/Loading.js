import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    width: ${props => props.width}px;
    height: ${props => props.height}px;
  }
`

const Loading = ({ width = 100, height = 100 }) => (
  <Wrapper width={width} height={height}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <rect x="19" y="19" width="20" height="20" fill="#06183d">
        <animate attributeName="fill" values="#a8e2ea;#06183d;#06183d" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0s" calcMode="discrete" />
      </rect>
      <rect x="40" y="19" width="20" height="20" fill="#06183d">
        <animate
          attributeName="fill"
          values="#a8e2ea;#06183d;#06183d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.125s"
          calcMode="discrete"
        />
      </rect>
      <rect x="61" y="19" width="20" height="20" fill="#06183d">
        <animate
          attributeName="fill"
          values="#a8e2ea;#06183d;#06183d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.25s"
          calcMode="discrete"
        />
      </rect>
      <rect x="19" y="40" width="20" height="20" fill="#06183d">
        <animate
          attributeName="fill"
          values="#a8e2ea;#06183d;#06183d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.875s"
          calcMode="discrete"
        />
      </rect>
      <rect x="61" y="40" width="20" height="20" fill="#06183d">
        <animate
          attributeName="fill"
          values="#a8e2ea;#06183d;#06183d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.375s"
          calcMode="discrete"
        />
      </rect>
      <rect x="19" y="61" width="20" height="20" fill="#06183d">
        <animate
          attributeName="fill"
          values="#a8e2ea;#06183d;#06183d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.75s"
          calcMode="discrete"
        />
      </rect>
      <rect x="40" y="61" width="20" height="20" fill="#06183d">
        <animate
          attributeName="fill"
          values="#a8e2ea;#06183d;#06183d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.625s"
          calcMode="discrete"
        />
      </rect>
      <rect x="61" y="61" width="20" height="20" fill="#06183d">
        <animate
          attributeName="fill"
          values="#a8e2ea;#06183d;#06183d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.5s"
          calcMode="discrete"
        />
      </rect>
    </svg>
  </Wrapper>
)

export default Loading
