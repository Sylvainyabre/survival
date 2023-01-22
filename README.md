# survival
## Contribution guide:

- `git clone https://github.com/Sylvainyabre/survival.git`
- create a new branch 
- add your changes `git add .`
-  commit as you get things done : `git commit -m <your message here>`
-  when ready to push : `git push origin <branch-name>`

## running
- do `cd ./frontend`
- then `npm start`

## Models

- Task
   - *status* : one of [created,in-progress,done]
   - *duration* : time it takes to completes this task
   - *owner*: the user who owns this task
   - *category*: one of [school subjects, "social"]
   - *deadline* : the deadline for this task


- User
   - *first_name*: required first name of the user
   - *last_name*: required last name of the user
   - *email* : required email address of the user
   - *phone_number* : required phone number of the the user
   - *preferred_com_mode*: the mode of communication that the user prefers
   - *subjects* : the subjects that the user is taking this term
   - *partners* : a ref to a user, the study partner of this user

## Drew doesnt forget

   - click go on the task brings you to a new page
   - clock/timer 
   - chatbox with other people who are in a task as wel
   - nice message/photo



## Functionalities
