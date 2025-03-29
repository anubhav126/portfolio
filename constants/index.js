const blog1 = `This blog will be an attempt for me to design the system design path for google drive from scratch. This is going to be my first time making such a blog. I will try to keep it as simple and beginner friendly as possible. Let us begin.
Everyone has used google drive (or one of its alternatives) at some point in our lives. We use it store and retrieve documents, edit them, move them and share them to other people among other things.
Technical Specifications
We need this service to be highly available at all times.
We need this service to create a folder, upload and view files, rename files, delete and download files. When i say files in this blog, I am generalizing the term to include documents of all file formats and extensions.
User should be able to download any of their files at any point of time.
The user should be able to move the files to any folder they want to.
Google Drive provides 15 GB of space in its free tier. We will be using the same metric for all of our assumptions here.
Let us understand the scaling aspect of our service.
Since we are dealing with a lot of users with a lot of storage (keep note that user purchasing different plans will have higher storage), managing all of that data in real-time is a pain.
Let us try to visualize using a rough estimation.`
const blog2 = `Prototypes are the core of how JavaScript functions work. Whether you are preparing for you next interview, or you just want to dive deep into the world of JavaScript, this guide should give you a solid grasp on prototypes in JavaScript. Let us begin.`
const blog3 = `In this guide, we will learn about mail servers and how to create one from scratch. We will go through the intricacies it takes for sending and receiving e-mails, understand what DNS lookup is, how SMTP server and the underlying protocol works and so much more. The curiosity for this blog came from this video by Piyush Garg. Highly recommended. Now without further wait, let’s begin.
But what even is a mail server?
Simply put, it’s just a server that facilitates sending and receiving of emails via the SMTP protocol.

Let us first see how does an SMTP server work.

An email client like Gmail or Outlook connects to the local SMTP server and submits the data.

The local SMTP server adds information such as message boundaries, timestamps and formats the message in accordance with SMTP standards.

The local SMTP server then looks up the receiver’s email domain via DNS and finds out the mail server for that domain.

The SMTP server opens a connection with the receiver’s mail server and transfers the email.`
const blog4 = `React is a JavaScript library used by many developers, both junior and senior. React has become extremely popular over the years because of its blazing-fast performance. But many developers might not know the reason behind this speed. I will demystify React in this article and uncover what makes it so fast. Let's begin! Let us begin with what reconciliation is. In react, whenever the state of a component changes, that component needs to update its UI to show the updated state. This process is known as reconciliation in react. React performs this using a virtual DOM, which is simply a representation of your actual DOM. When the state of a component changes, React compares the virtual DOM with the actual DOM and then updates the nodes of the DOM tree based on the difference between the two DOMs. This comparison is done with the help of a diffing algorithm.

The Diffing Algorithm
This is the algorithm behind React's fast updation of the virtual DOM. Similar algorithms that perform tree diff have a time complexity of O(n^3) where "n" represents the number of elements in the DOM tree. As the number of elements inside the DOM tree increases, the time complexity of these algorithms can get unbearably large. On the other hand, the diffing algorithm performs tree diffing in O(n)`
export const exploreWorlds = [
  {
    id: 'project-1',
    imgUrl: '/storeIt.png',
    link: 'https://anubhav-storage-app.vercel.app',
    title: 'Storage Management App',
  },
  {
    id: 'project-2',
    imgUrl: '/reverseProxy.png',
    link: 'https://github.com/anubhav126/reverse-proxy',
    title: 'Reverse proxy from scratch using node',
  },
  {
    id: 'world-3',
    imgUrl: '/planet-03.png',
    title: 'Kadirojo Permai',
  },
  {
    id: 'world-4',
    imgUrl: '/planet-04.png',
    title: 'Paradise Island',
  },
  {
    id: 'world-5',
    imgUrl: '/planet-05.png',
    title: 'Hawkins Labs',
  },
];

export const startingFeatures = [
  `Working in HCLTech as a software engineer building scalable applications`,
  `Working on a mobile app that recommends movies based on your personality traits`,
  `Writing detailed tech blogs on Hashnode`,
];

export const newFeatures = [
  {
    imgUrl: '/vrpano.svg',
    title: 'A new world',
    subtitle:
        'we have the latest update with new world for you to try never mind',
  },
  {
    imgUrl: '/headset.svg',
    title: 'More realistic',
    subtitle:
        'In the latest update, your eyes are narrow, making the world more realistic than ever',
  },
];

export const insights = [
  {
    imgUrl: '/blog4.png',
    title: `Google Drive System Design Deep Dive`,
    subtitle: blog2,
        
    url: 'https://anubhav1206.hashnode.dev/google-drive-system-design-deep-dive',
  },
  {
    imgUrl: '/blog1.png',
    title: 'JavaScript Prototypes',
    subtitle: blog1,
    url: 'https://anubhav1206.hashnode.dev/javascript-prototypes-your-one-stop-guide-for-understanding-this-core-javascript-concept',
    preview: "Prototypes are the core of how JavaScript functions. Whether you're preparing for your next interview...",
  },
  {
    imgUrl: '/blog2.png',
    title: 'Create your own Mail Server!',
    subtitle: blog3,
    url: 'https://anubhav1206.hashnode.dev/create-your-own-mail-server',
  },
  {
    imgUrl: '/blog3.png',
    title: `The Reasons Behind React's Fast Performance`,
    subtitle: blog4,
    url: 'https://anubhav1206.hashnode.dev/the-reasons-behind-reacts-fast-performance',
  },
  
];

export const socials = [
  {
    name: 'twitter',
    url: '/twitter.svg',
  },
  {
    name: 'linkedin',
    url: '/linkedin.svg',
  },
  {
    name: 'github',
    url: '/github.svg',
  },
  {
    name: 'hashnode.svg',
    url: '/hashnode.svg',
  },
];
