# Instagram Web UI clone with ReactJS

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). This is a clone of the [Instagram Web UI](https://www.instagram.com). It implements User registration, User Login, and image posting functionality, similar to Instagram. <br />
<p> <strong>DISCLAIMER:</strong> This app has nothing to do with original Instagram.This is purely for educational purposes.</p> 

## Deployment

This app has been deloyed [here](https://instagram-clone-e4541.web.app/) with the help of **Firebase**

## Steps to Implement the Instagram Embed
The Instagram Embed has been done with the help of [react-instagram-embed](https://www.npmjs.com/package/react-instagram-embed). However, there's a catch. This package uses Facebook's [oEmbed API](https://developers.facebook.com/docs/instagram/oembed) to access the posts of facebook and instagram. Facebook doesn't allow public access to this API. To gain access, one must have the following:
<ul>
    <li>A <a href="https://developers.facebook.com/">Facebook Developer's Account</a></li>
    <li>A <a href="https://developers.facebook.com/docs/development#register">Registered Facebook App</a></li>
    <li>The <a href="https://developers.facebook.com/docs/instagram/oembed#oembed-product">oEmbed product</a> added to the app</li>
    <li>An <a href="https://developers.facebook.com/docs/instagram/oembed#access-tokens">Access Token</a>. It is essentially a string consisting of the facebook app ID and client token separated by a pipe(|) symbol</li>
    <li>The Facebook App must be in <a href="https://developers.facebook.com/docs/development#live-mode">Live Mode</a></li>
    <li>To Release a facebook app, one must provide a <strong>Privacy Policy URL</strong> and a <strong>Data deletion callback/instruction URL</strong>. Generally free privacy policy providers are available for this purpose and you can set both the above mentioned URL's to be the same</li>
</ul> 

### Scripts: `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


