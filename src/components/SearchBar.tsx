import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect } from "react"

// setup validation using zod
const formSchema = z.object({
  searchQuery: z.string({
    // error will be used for debugging, not used in UI
    required_error: "Restaurant name is required",
  }),
})

// define the typescript type for our SearchForm data
// using zod framework to automatically infer/determine the typescript type based on form schema
// basically it will detect that all our form inputs should be of the type as per our schema.
// (hover over SearchForm)
export type SearchForm = z.infer<typeof formSchema>

// typescripting props
type Props = {
  onSubmit: (formData: SearchForm) => void
  placeHolder: string
  onReset?: () => void
  searchQuery: string
}

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
  // initialize a form using useForm hook from react-hook
  // this form will be of type SearchForm which holds the fields we want to capture
  const form = useForm<SearchForm>({
    // passing in options: zodResolver for validations.
    // basically connecting our react-hook-form with our zod validations
    resolver: zodResolver(formSchema),
    // default value for searchForm (which only holds searchQuery) will be 'searchQuery' (updated via useEffect)
    defaultValues: {
      searchQuery,
    },
  })

  // runs every time a new searchQery is received from the props
  // used to update the form with the new searchQuery
  useEffect(() => {
    form.reset({ searchQuery })
  }, [form, searchQuery])

  // for clearing the form
  const handleReset = () => {
    form.reset({
      searchQuery: "",
    })

    // if an onReset was passed from the parent, call the fn
    // (onReset will handle updating the global state after form was cleared)
    if (onReset) {
      onReset()
    }
  }

  return (
    // shadcn form wrapper. Spread and Pass in 'form' to tie shadcn with react-hook-form
    <Form {...form}>
      {/* 'handleSubmit' provided by react-hook-form. When form is submitted, 'handleSubmit' from react-hook will validate our data.
      if data passes validation, it will call onSubmit fn which wll handle the submission logic */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // spacing between the icon, the form input, and the buttons. Add a border.
        // change to a redborder if theres an error on the searchQuery (defined in our zod schema) e.g. when a user submits without entering anything
        className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        {/* magnifying glass icon using lucide-react. HIdden on mobile screens */}
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />
        <FormField
          // control attribute links this component to the react-hook-form
          control={form.control}
          name="searchQuery"
          // What you want to render
          render={({ field }) => (
            // take available width
            <FormItem className="flex-1">
              <FormControl>
                {/* registers the input with the react-hook-form library. (E.g. in traditional react, we would use the onChange handler to sync form input + state) */}
                <Input
                  {...field}
                  // removing default shadow and border from the input component. Remove visible ring on focus
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                  // pass placeHolder from props
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* shadcn button variant */}
        <Button
          // fn that clears the form
          onClick={handleReset}
          type="button"
          variant="outline"
          className="rounded-full"
        >
          Reset
        </Button>
        <Button type="submit" className="rounded-full bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  )
}

export default SearchBar
