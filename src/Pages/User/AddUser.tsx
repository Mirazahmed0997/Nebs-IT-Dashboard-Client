
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"

export function AddUserModal() {
  const [open, setOpen] = useState(false)
  const form = useForm()
  const [departments, setDepartments] = useState([])

  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/Department")
      const data = await res.json()
      setDepartments(data?.data || [])
    } catch (err) {
      console.log("Failed to fetch departments:", err)
    }
  }


  useEffect(() => {
    fetchDepartments()
  }, [])

  const createEmployee = async (payload: any) => {
    const res = await fetch("http://localhost:5000/api/v1/Employee/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    return data
  }

  const onSubmit = async (data: any) => {

    const res = await createEmployee(data)

    if (!res.success) {
      alert(res.message || "Error creating employee")
      return
    }

    alert("Employee created successfully")
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-blue-700">Add Employee</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add New Employee
          </DialogTitle>
          <DialogDescription>
            Fill all fields to create a new employee.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Enter email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee ID</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter employee ID" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Department</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="border p-2 rounded-md"
                    >
                      <option value="">Select department</option>
                      {departments?.data.map((d: any) => (
                        <option key={d._id} value={d._id}>
                          {d.title}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Role</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="border p-2 rounded-md"
                    >
                      <option value="">Select role</option>
                      <option value="SALES">SALES</option>
                      <option value="OPERATIONS">OPERATIONS</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Save Employee
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
