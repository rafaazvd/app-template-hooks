import styled, { css } from 'styled-components/native';
import IconFeather from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isError: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    height: 54px;
    padding: 0 10px;
    background: #232129;
    border-radius: 10px;
    margin-bottom: 7px;
    border-width: 2px;
    border-color: #232129;

    flex-direction: row;
    align-items: center;

    ${(props) =>
      props.isFocused &&
      css`
        border-color: #ff9000;
      `}
      ${(props) =>
      props.isError &&
      css`
        border-color: #c53030;
      `}
`;

export const TextInput = styled.TextInput`
    flex: 1;
    color: #fff;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(IconFeather)`
    margin-right: 16px;
`;

