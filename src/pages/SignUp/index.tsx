import React, { useCallback, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';
import validationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  SecretPassword
} from './styles';

interface Users {
  name: string;
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const [secret, setSecret] = useState(true);
  const formRef = useRef<FormHandles>();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);


  const handleSubmit = useCallback(
    async (data: Users) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um Email válido'),
          password: Yup.string().min(6, 'No minimo 6 digítos'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', data);
        Alert.alert('Cadastro Realizado', 'Você já pode fazer login na aplicação');
        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = validationErrors(err);
          formRef.current?.setErrors(errors);
          return
        }
        Alert.alert(
          'Erro na autenticação',
          'ocorreu um erro ao fazer login'
        )
      }
    },
    [],
  );

  return (
    <KeyboardAvoidingView
    style={{flex: 1}}
    behavior={Platform.OS === 'ios'? 'padding': undefined}
    enabled
    >
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flex: 1}}
      >
    <Container>
      <Image source={logoImg} />
      <Title>Crie sua conta</Title>

      <Form ref={formRef} onSubmit={handleSubmit}>

      <Input
      autoCorrect={false}
      autoCapitalize="words"
      name="name"
      icon="user"
      placeholder="Seu Nome"
      returnKeyType="next"
      onSubmitEditing={() => {
        emailRef.current.focus();
      }}
      />

      <Input
      ref={emailRef}
      autoCorrect={false}
      autoCapitalize="none"
      keyboardType="email-address"
      name="email"
      icon="mail"
      placeholder="E-mail"
      returnKeyType="next"
      onSubmitEditing={() => {
        passwordRef.current.focus();
      }}
      />

{
       secret ?
       <>
       <Input
        ref={passwordRef}
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
        ref={passwordRef}
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
      }} >Entrar</Button>

    </Container>

    <BackToSignIn onPress={() => navigation.navigate('SignIn')}>
      <Icon name="arrow-left" color="#ff9000" size={20} />
      <BackToSignInText>Voltar para Logon</BackToSignInText>
    </BackToSignIn>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
export default SignIn;
