import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddUserModal } from "@/Pages/User/AddUser";
import { useEffect, useState } from "react";

const UserList = () => {
  const [employees, setEmployees] = useState([])

  const fetchEmployees = async () => {
    try {
      const res = await fetch("https://nebs-it-dashboard-server.onrender.com/api/v1/Employee")
      const data = await res.json()
      setEmployees(data?.data || [])
    } catch (err) {
      console.log("Failed to fetch departments:", err)
    }
  }
  useEffect(() => {
    fetchEmployees()
  }, [])


  return (
    <div className="p-4 w-[1100px]">
      <Table>


        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead></TableHead>
            <TableHead>Email</TableHead>
            <TableHead></TableHead>
            <TableHead>Employee ID</TableHead>
            <TableHead></TableHead>
            <TableHead>Department</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead>Role</TableHead>

            <TableHead>

              <AddUserModal />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees?.data?.map((e: any, i: any) => (
            <TableRow key={e.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{e.name}</TableCell>
              <TableCell></TableCell>
              <TableCell>{e.email}</TableCell>
              <TableCell></TableCell>
              <TableCell>{e.employeeId}</TableCell>
              <TableCell></TableCell>
              <TableCell>{e.department?.title}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>{e.role}</TableCell>
              




            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
