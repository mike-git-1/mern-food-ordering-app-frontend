import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi"
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"

const UserProfilePage = () => {
  // our custom hook for getting current user for prepopulating fields
  // note: currentUser has a type of 'user' which we defined in type.js and implemented in MyUserApi.tsx. This is good practice so that Typescript doesnt get confused about
  // what type our variables are...
  const { currentUser, isLoading: isGetLoading } = useGetMyUser()
  // our custom hook for updating user profile
  // give an alias since useGetMyUser() also has an 'isLoading' variable.
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser()

  // if still Loading, render some loading text and prevent the form from loading since the fields have not been pre-populated yet
  // recall: component will re-render when any of the states change e.g. isLoading updates to 'false' and  this conditional is checked again
  if (isGetLoading) {
    return <span>Loading...</span>
  }

  // in case something goes wrong where we cant find the user (e.g. fetch failed, network drops, error...)..
  if (!currentUser) {
    return <span>Unable to load user profile...</span>
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  )
}

export default UserProfilePage
