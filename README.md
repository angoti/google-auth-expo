# google-auth-expo

![GitHub repo size](https://img.shields.io/github/repo-size/angoti/google-auth-expo?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/angoti/google-auth-expo?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/angoti/google-auth-expo?style=for-the-badge)

<div float="left">
<img src="docs/images/Google-Firebase-SignIn1.png" alt="Botão Google Login" width="18%">
<img src="docs/images/Google-Firebase-SignIn2.png" alt="Escolha do usuário" width="18%">
<img src="docs/images/Google-Firebase-SignIn3.png" alt="Exibindo o email do usuário logado" width="18%">
<img src="docs/images/Google-Firebase-SignIn4.png" alt="Exibindo imagem do usuáro logado" width="18%">
<img src="docs/images/Google-Firebase-SignIn5.png" alt="Navegador Drawer" width="18%">
</div>

App demonstrativo de uso da autenticação Firebase/Google usando Expo react native.

## 💻 Instruções para executar o app 

Siga rigorosamente as instruções
1. Execute o comandon: <code>npx expo prebuild --clean</code>
2. React Native Firebase [Android setup](https://rnfirebase.io/#2-android-setup)
3. React Native Firebase integração com Expo [managed workflow](https://rnfirebase.io/#managed-workflow).
4. Para executar: <code>npx expo run:android</code> [Development build](https://docs.expo.dev/develop/development-builds/development-workflows/#build-locally-with-android-studio-and-xcode)

## 🚀 Instruções para construir o apk
1. Criar o arquivo keystore na pasta android/app

<code>keytool -genkey -v -keystore app.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000</code>

2. Editar o arquivo <i>android\app\build.gradle</i>

<code>android {
....
  signingConfigs {
    release {
      storeFile file('app.keystore')
      storePassword 'senha informada na criação do arquivo app.keystore'
      keyAlias 'nome alias informado na criação do arquivo app.keystore'
      keyPassword 'senha alias informada na criação do arquivo app.keystore'
    }
  }
  buildTypes {
    release {
      ....
      signingConfig signingConfigs.release
    }
  }
}</code>

3. Execute o comando na raiz do projeto

<code>npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/</code>

4. Execute a sequência de comandos para gerar o apk
 
<code>cd android
gradlew assembleRelease</code>

o arquivo gerado fica em: <code>android/app/build/outputs/apk/app-release.apk</code>
Caso aconteça erro, execute os seguintes comnandos e repita o passo 4.

<code>rm -rf ./android/app/src/main/res/drawable-*</code>

<code>rm -rf ./android/app/src/main/res/raw</code>
