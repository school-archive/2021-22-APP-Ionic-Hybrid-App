# 2021-22-Ionic-Hybrid-App

## Getting started

Install Ionic CLI:
```shell
npm install -g @ionic/cli
```

Install Ionic Storage:
```shell
npm install -g @ionic/storage
```

Install dependencies:
```shell
npm install
```

```shell
ionic serve
```

## Deploying Mobile
https://ionicframework.com/docs/vue/your-first-app/deploying-mobile

Serve Ionic as Android App with Android Studio:
```shell
ionic build
```
```shell
ionic cap add android
```
```shell
ionic cap add android
```
```shell
ionic cap copy
```
```shell
ionic cap sync
```
```shell
ionic cap open android
```

Serve Ionic as iOS App with XCode:
```shell
ionic build
```
```shell
ionic cap add ios
```
```shell
ionic cap copy
```
```shell
cd ios/App
```
Intel Macs:
```shell
pod install
```
ARM Macs:
```shell
sudo arch -x68_64 gem install ffi
arch -x86_64 pod install
```
Intel/ARM Macs:
```shell
ionic cap sync
```
```shell
ionic cap open ios
```

Ionic docs:
https://ionicframework.com/docs/

Ionic Vue tutorial:
https://ionicframework.com/docs/vue/your-first-app

Ionic Data Storage API:
https://ionicframework.com/docs/vue/storage