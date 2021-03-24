# Instagram Web UI clone with ReactJS

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). This is a clone of the [Instagram Web UI](https://www.instagram.com). It implements User registration, User Login, and image posting functionality, similar to Instagram. <br />
<p> **DISCLAIMER:** This app has nothing to do with original Instagram.This is purely for educational purposes.</p> 

## Deployment

This app has been deloyed [here](https://instagram-clone-e4541.web.app/) with the help of **Firebase**

## Steps to Implement the Instagram Embed
The Instagram Embed has been done with the help of [react-instagram-embed](https://www.npmjs.com/package/react-instagram-embed). However, there's a catch. This package uses Facebook's [oEmbed API](https://developers.facebook.com/docs/instagram/oembed) to access the posts of facebook and instagram. Facebook doesn't allow public access to this API. To gain access, one must have the following:
<ul>
    <li>A [facebook developer's account](https://developers.facebook.com/)</li>
    <li>A [Registered Facebook APP](https://developers.facebook.com/docs/development#register)</li>
    <li>The [oEmbed product](https://developers.facebook.com/docs/instagram/oembed#oembed-product) added to the app</li>
    <li>An [Access Token](https://developers.facebook.com/docs/instagram/oembed#access-tokens)</li>
    <li>The Facebook App must be in [Live Mode](https://developers.facebook.com/docs/development#live-mode)</li>
    <li>To Release a facebook app, one must provide a **Privacy Policy URL** and a **Data deletion callback/instruction URL**. Generally free privacy policy providers are available for this purpose and you can set both the above mentioned URL's to be the same</li>
</ul> 

### Scripts: `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


