import React, { useCallback, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';


import logoImg from '../../assets/logo.png';
import validationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/AuthContext';
import Button from '../../components/Button';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText,
  SecretPassword,
 } from './styles';

 interface Credentials {
   email: string;
   password: string;
 }

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>();
  const inputPasswordRef = useRef<TextInput>();
  const [secret, setSecret] = useState(true);
  const { signIn, signOut, user } = useAuth();
  console.log(user);
  const handleSubmit = useCallback(
    async (data: Credentials) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um Email válido'),
          password: Yup.string().required('senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        const { email, password } = data;
        await signIn({
          email,
          password
        });

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = validationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro na aut6enticação',
          'ocorreu um erro ao fazer login'
        )
      }
    },
    [signIn],
  );


  return (
    <KeyboardAvoidingView
    style={{flex: 1}}
    behavior={Platform.OS === 'ios'? 'padding': undefined}
    enabled
    >
    <ScrollView
      keyboardShouldPersistTaps="handled"
      >
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu logon</Title>

      <Form ref={formRef} onSubmit={handleSubmit}>

        <Input
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-address"
        name="email"
        icon="mail"
        placeholder="E-mail"
        returnKeyType="next"
        onSubmitEditing={() => {
          inputPasswordRef.current.focus()
        }}
        />
       {
       secret ?
       <>
       <Input
        ref={inputPasswordRef}
        name="password"
        icon="lock"
        placeholder="Senha"
        secureTextEntry
        returnKeyType="send"
        onSubmitEditing={() => {
          formRef.current.submitForm();
        }}
        />
        <SecretPassword
          onPress={() => setSecret(!secret)}
          >
          <Icon name="eye" color="#ff9000" size={20} />
          </SecretPassword>
          </> :
          <>
        <Input
        autoCorrect={false}
        autoCapitalize="none"
        name="password"
        icon="lock"
        placeholder="Senha"
        returnKeyType="send"
        onSubmitEditing={() => {
          formRef.current.submitForm();
        }}
        />
          <SecretPassword
          onPress={() => setSecret(!secret)}
          >
             <Icon name="eye" color="#ff9000" size={20} />
          </SecretPassword>
          </>
      }

     </Form>

      <Button onPress={() => {
        formRef.current.submitForm();
      }}>Entrar</Button>

      <ForgotPassword onPress={() => {console.log('esqueci senha')}}>
        <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
      </ForgotPassword>

    </Container>

    <CreateAccount onPress={() => navigation.navigate('SignUp')}>

      <Icon name="log-in" color="#ff9000" size={20} />
      <CreateAccountText>Criar uma conta</CreateAccountText>

    </CreateAccount>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
export default SignIn;
