import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

const ImageSection = () => {
  // this component will be nested in the parent component ManageRestaurantForm.tsx
  // so this hook allows this child component to access the control object from the parent where useForm was initially created.
  // useful because we dont need to pass the control prop down.
  // watch hook allows you to track current values of specific fields in the form, trigger re-renders when a field value changes, and dynamically react to changes.
  const { control, watch } = useFormContext()

  // used to prepopulate the image
  // Here, we track the value of the cloudinary'imageUrl property of the restaurant object in the useform state
  // E.G when the form pre-populates with data from the backend where an image was already uplaoded, we can get the image Url to display the image
  const existingImageUrl = watch("imageUrl")

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl-font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the existing one
        </FormDescription>
      </div>
      {/* container 50% of width on medium screens and full width on smaller (flex)*/}
      <div className="flex flex-col gap-8 md:w-[50%]">
        {/* prepopulate the image within a shadcn aspect ratio component. Ensures image keeps 16/9 aspect ratio no matter the size*/}
        {/* if an image exists, then render the image */}
        {existingImageUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingImageUrl}
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}
        <FormField
          // links this component with react-hook-form
          control={control}
          name="imageFile"
          // What you want to render
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* links this input with the component which links to react-hook-form*/}
                <Input
                  // For file inputs, we don't spread 'field' because the value of file inputs is managed by the browser, and React Hook Form tracks the file via onChange.
                  // (e.g. When a user selects a file, the browser stores it in input.files (not input.value))
                  // When spreading the field props into the Input component (as required for React Hook Form), it automatically provides a value prop
                  // (among other properties like onChange and onBlur). However, file inputs (like <input type="file">) should not use the value prop because it is
                  // managed by the browser and cannot be controlled directly via JavaScript.
                  // If you spread the field props onto the Input component and React Hook Form tries to assign a value to the file input, it conflicts with the
                  // nature of file inputs. File inputs don't behave like typical form controls where you can bind the value to the form state.
                  // {...field}

                  // makes this input a file input field
                  type="file"
                  // accepts only these image file formats
                  accept=".jpg, .jpeg, .png"
                  // onChange: triggers when input changes e.g. when a file is selected (not the same as the onChange in the next line)
                  // updates the field state using react-hook-form 'onChange' method to either the image file that was selected, or null if no file was selected
                  // if user selects more than 1 image, only get the first one in the array
                  onChange={(e) =>
                    //When a user selects a file, the browser stores it in input.files (not input.value))
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                  className="bg-white"
                />
              </FormControl>
              {/* if any errors, displays it below the form. It will display the errpr message defined in our zod schema*/}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default ImageSection
