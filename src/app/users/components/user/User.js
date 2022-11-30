import { useState } from 'react';
import {
  Avatar,
  Button,
  Dialog,
  Title,
  Subtitle
} from '../../../library/index';
import styles from './User.module.scss';

const User = ({ user, showProfileDetails, handleAction }) => {
  const [state, toggleState] = useState();

  const handleShowDialog = (e) => {
    e.stopPropagation();
    toggleState((prevState) => !prevState);
  };

  const handleClickOutside = () => {
    toggleState(false);
  };
  return (
    <>
      <div
        className={styles.container}
        onClick={() => showProfileDetails(user)}
        data-testid="userDetails"
      >
        <div className={styles.userProfile}>
          <div>
            <Avatar alt={user.first_name} src={user.avatar} />
            <div className={styles.textProfile}>
              <div className={styles.cardName}>
                {user.first_name} {user.last_name}
              </div>
              <div className={styles.cardText}>{user.description}</div>
            </div>
            <div className={styles.cardAction}>
              <Button
                type="quinary"
                text="Delete"
                actionButton={(e) => handleShowDialog(e)}
                dataTestId="submitForm"
              />
            </div>
          </div>
        </div>
      </div>
      {state && (
        <Dialog
          header={
            <Title text={'Delete User'} customClassName={styles.centerText} />
          }
          body={
            <Subtitle
              text={'Are you sure you want to delete user?'}
              customClassName={styles.centerText}
            />
          }
          footer={
            <>
              <Button
                type="quaternary"
                text={'Delete'}
                actionButton={handleAction}
              />
              <Button
                type="tertiary"
                text={'Dismiss'}
                actionButton={(e) => handleShowDialog(e)}
              />
            </>
          }
          handleClickOutside={handleClickOutside}
        />
      )}
    </>
  );
};
export default User;
