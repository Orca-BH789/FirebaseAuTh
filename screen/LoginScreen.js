import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import { View, TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';

export const LoginScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('');
  const { passwordVisibility, handlePasswordVisibility, rightIcon } = useTogglePasswordVisibility();

  const handleLogin = (values) => {
    const { email, password } = values;
    auth().signInWithEmailAndPassword(email, password)
      .then(({ user }) => console.log(user))
      .catch(error => setErrorState(error.message));
  };

  return (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={styles.screenTitle}>Welcome back!</Text>
        </View>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={values => handleLogin(values)}
        >
          {({ values, touched, errors, handleChange, handleSubmit, handleBlur }) => (
            <>
              <TextInput
                name='email'
                leftIconName='email'
                placeholder='Enter email'
                autoCapitalize='none'
                keyboardType='email-address'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              <FormErrorMessage error={errors.email} visible={touched.email} />
              <TextInput
                name='password'
                leftIconName='key-variant'
                placeholder='Enter password'
                autoCapitalize='none'
                secureTextEntry={passwordVisibility}
                rightIcon={rightIcon}
                handlePasswordVisibility={handlePasswordVisibility}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <FormErrorMessage error={errors.password} visible={touched.password} />
              {errorState !== '' && <FormErrorMessage error={errorState} visible={true} />}
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </Button>
            </>
          )}
        </Formik>
        <Button borderless title='Forgot Password' onPress={() => navigation.navigate('ForgotPassword')} />
        <Button borderless title='Create a new account' onPress={() => navigation.navigate('Signup')} />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingHorizontal: 12 },
  logoContainer: { alignItems: 'center' },
  screenTitle: { fontSize: 32, fontWeight: '700', color: Colors.black, paddingTop: 20 },
  button: { width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 8, backgroundColor: Colors.orange, padding: 10, borderRadius: 8 },
  buttonText: { fontSize: 20, color: Colors.white, fontWeight: '700' },
  borderlessButtonContainer: { marginTop: 16, alignItems: 'center', justifyContent: 'center' }
});
