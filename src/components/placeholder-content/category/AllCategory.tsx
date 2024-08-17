import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { api } from '~/trpc/server'
import ActionDropDown from '../projects/ActionDropDown'
import { fetchCategory } from '~/actions/fetch-category'


const AllCategory = async () => {

 const data = await fetchCategory()
    return (
        <Card className="rounded-lg border-none mt-6">
            <CardContent className="p-6">
                <div className="flex flex-col gap-4 min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]  ">
                    {
                        data && data.map((cat) => (
                            <Card className="h-fit w-full relative" key={cat.id}>
                                <ActionDropDown />
                                <CardHeader>
                                    <CardTitle className="flex gap-2 items-center ">
                                        {cat.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>5 Projects</p>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>

            </CardContent>
        </Card>
    )
}

export default AllCategory
