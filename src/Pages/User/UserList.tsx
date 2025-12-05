import { deleteTask, selectTask, toggolCompleteState, updateFilter } from "@/State/Feature/Task/TaskSlice";
import { useAppDispatch, useAppSelector } from "@/State/hooks";
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
import { Trash } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // ✅ use shadcn/ui Tabs, not @radix-ui/react-tabs
import { selectUsers } from "@/State/Feature/User/UserSlice";
import { AddUserModal } from "@/Pages/User/AddUser";

const UserList = () => {
  const tasks = useAppSelector(selectTask);
  const users= useAppSelector(selectUsers)
  console.log("tasks",tasks)
  const dispatch = useAppDispatch();

  return (
    <div className="p-4">
      <Table>
        <TableCaption>
          {/* ✅ Proper Tabs setup using shadcn/ui wrapper */}
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4 mb-2">
              <TabsTrigger value="all" onClick={() => dispatch(updateFilter("all"))}>
                All
              </TabsTrigger>
              <TabsTrigger value="Low" onClick={() => dispatch(updateFilter("Low"))}>
                Low
              </TabsTrigger>
              <TabsTrigger value="Medium" onClick={() => dispatch(updateFilter("Medium"))}>
                Medium
              </TabsTrigger>
              <TabsTrigger value="High" onClick={() => dispatch(updateFilter("High"))}>
                High
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>

              <AddUserModal/>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task, i) => (
            <TableRow key={task.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>

              <TableCell>
                {task.priority === "Low" ? (
                  <div className="bg-green-500 text-white px-2 py-1 rounded">
                    {task.priority}
                  </div>
                ) : task.priority === "High" ? (
                  <div className="bg-red-500 text-white px-2 py-1 rounded">
                    {task.priority}
                  </div>
                ) : (
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded">
                    {task.priority}
                  </div>
                )}
              </TableCell>

              <TableCell>{task.dueDate}</TableCell>



              <TableCell>
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => dispatch(toggolCompleteState(task.id))}
                  className="w-5 h-5 cursor-pointer accent-green-600"
                />
              </TableCell>

              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => dispatch(deleteTask(task.id))}
                  className="flex items-center gap-1"
                >
                  <Trash className="w-4 h-4" />
                  Delete
                </Button>
              </TableCell>
                  <TableCell>Assign to - {task? task.assignTo : "None"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
