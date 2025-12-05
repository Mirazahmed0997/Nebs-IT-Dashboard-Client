import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useAppDispatch } from "@/State/hooks"
import { addUser } from "@/State/Feature/User/UserSlice"
import { useState } from "react"

export function AddUserModal() {
  const [open,setOpen]= useState(false)
  const form = useForm()
  const dispatch = useAppDispatch()

  const onSubmit = (data: any) => {
    console.log(data)
    setOpen(false)
    form.reset()
    dispatch(addUser(data))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200">
          Add User
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg w-full sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Add New User
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Fill out the information below to create a new user.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Enter user's name"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      value={field.value || ""}
                      placeholder="Enter user's email"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer */}
            <DialogFooter className="pt-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200"
              >
                Save User
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
