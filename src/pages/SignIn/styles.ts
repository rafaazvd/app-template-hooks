import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 33px 33px  103px 33px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 26px 0 24px;
`;

export const ForgotPassword  = styled.TouchableOpacity`
    margin-top: 24px;
`;
export const SecretPassword  = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  margin-top: 26%;
  margin-right: 12px;
`;

export const ForgotPasswordText = styled.Text`
    color: #f4ede8;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`;

export const CreateAccount = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  padding: 16px 0;
  border-top-width: 1px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 43px;
`;

export const CreateAccountText = styled.Text`
  color: #ff9000;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;

