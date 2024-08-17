
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import { Badge } from "../../ui/badge";
import ActionDropDown from "./ActionDropDown";


export default function AllProjects() {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="grid gap-8 min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="h-fit w-full relative">
            <ActionDropDown />
            <CardHeader>
              <CardTitle className="flex gap-2 items-center ">
                <Button
                  variant="outline"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="#" alt="Avatar" />
                    <AvatarFallback className="bg-transparent">JD</AvatarFallback>
                  </Avatar>
                </Button>
                Add Navbar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Progress</p>
              <Progress value={33} className="h-2" />
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Badge variant="outline">Web Development</Badge>
              <Badge variant="outline">Study</Badge>
            </CardFooter>
          </Card>

          <Card className="h-fit w-full">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center ">
                <Button
                  variant="outline"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="#" alt="Avatar" />
                    <AvatarFallback className="bg-transparent">JD</AvatarFallback>
                  </Avatar>
                </Button>
                Add Navbar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Progress</p>
              <Progress value={33} className="h-2" />
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Badge variant="outline">Web Development</Badge>
              <Badge variant="outline">Study</Badge>
            </CardFooter>
          </Card>

          <Card className="h-fit w-full">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center ">
                <Button
                  variant="outline"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="#" alt="Avatar" />
                    <AvatarFallback className="bg-transparent">JD</AvatarFallback>
                  </Avatar>
                </Button>
                Add Navbar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Progress</p>
              <Progress value={33} className="h-2" />
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Badge variant="outline">Web Development</Badge>
              <Badge variant="outline">Study</Badge>
            </CardFooter>
          </Card>
        </div>

      </CardContent>
    </Card>
  );
}
