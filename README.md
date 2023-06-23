# Human AI Experiment - Group
Project built to conduct a crowd computing experiment involving the study of human-ai interaction.


# Local setup

## Dependencies

In order to run the system locally, please make sure you have the following dependencies setup:

- **Docker** 
- **docker-compose** 
- **npm** 
- **React** 
- **gcloud** 


## Setup Guide

### Backend

In order to run the backend, please make sure you have a  [Google Cloud Project](https://cloud.google.com) setup. You also need to enable Firestore in your Google Cloud Project, as well as setup an IAM service account that has access rights to Firestore. You should generate and download a key for your IAM service accounts and save it as 'key.json' inside *task-backend-service/keys*. 

**Important**: If you are a professor ot a TA grading our assignment you can skip the above step, since I already have a Google Cloud Project and an IAM service account key configured. The key will become stale after we receive our grades from university for security reasons.

In order to start the backend on your local machine, please run the following command from the root folder of the repository:

```
docker-compose up
```

This will run a docker container with our backend service.

### Frontend

To run the frontend locally, navigate to *task-frontend* and then run:

```
npm start
```

This will run the frontend application in the Debug mode, which is enough to explore how it works. 


Note, that in order for the room to start, 3 users with different session ids prolific ids need to be active. The prolific id and the session id are provided as URL parameters in the following way:

```
http://localhost:3000?PROLIFIC_PID=<prolific_id>&SESSION_ID=<session_id>
```

The prolific and session ids can be any unique combination of numbers and characters. They don't need to be valid in this setup.

# Hosted Demo

We also offer hosted demos for both a single user and a collaborative instance of our system. In the case of the collaborative instance, at least 3 users need to be connected for the room to start.

The individual instance can be accessed at the following URL:

```
https://steady-computer-390316.web.app/?PROLIFIC_PID=<prolific_id>&SESSION_ID=<session_id>
```

The group instance can be accessed at:

```
https://crowdcomputing-388121.web.app/?PROLIFIC_PID=<prolific_id>&SESSION_ID=<session_id>
```

As mentioned before, you can replace '<prolific_id>' and '<session_id>' with any alphanumeric codes.


# Brief presentation of the system

When designing our software system (application) we aimed for simplicity both in terms of implementation and usability. 

From an implementation perspective, the time we had available was very limited. In addition to that, due to our limited budget that only allowed for 1 single crowdsourcing experiment, it was very important for our application not to contain any bugs. Since we also had limited time for testing, aiming for a simple application design that would reduce the risk of bugs was the only viable option. As a result of this, we followed a simple client-server architecture for our system, as shown in Figure 1.

![Figure 1](/imgs/backend_arch.png)
**Figure 1**

Our backend was implemented in Flask and used Firestore as a database. Our API was structured in multiple groups, each group corresponding to a certain functionality, such as live chat, vote registration, retrieving information about a task, room management, etc. The backend followed the model-view-controller architectural pattern, which is the standard for simple applications. One interesting feature of our backend is the timeout system. Since our task required all 3 crowdworkers to participate, one of the crowdworkers quitting or going AFK had the potential to ruin our experiment. Thus, to mitigate for such situations, we decided to implement a timeout system using a periodic background process that would analyze the user activity in every room. 

Our frontend was implemented using React in combination with the Ant Design UI library. We put a lot of effort into making our user interface responsive. This was important, since the app would be used by people with different screen resolutions. A lot of emphasis was placed in creating an appealing and easy to use chat box. Since collaboration between participants was a core part of our experiment, we wanted to make the users very likely to interact with each other. As a result of this, we decided to arrange the default configuration of the screen in such a way that the chat box would be open and partly overlapping the task description. In this way, as the user would try to read the task description, he or she would be forced to interact with the chat box by either minimizing it or moving it to some other part of the screen. In this way, we made sure that none of the users would miss the chat box. Figure 2 shows the default visual configuration of our frontend.

![Figure 2](/imgs/frontend.png)
**Figure 2**

The prolific accounts of the crowdworkers were linked to our application by means of URL parameters. This approach was preferable over getting the users to manually input their prolific ids, since it minimized the risk of human error. 
