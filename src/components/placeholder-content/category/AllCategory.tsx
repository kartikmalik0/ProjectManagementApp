"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import ActionDropDown from '../projects/ActionDropDown'
import { Category, useCategory } from '~/providers/category-context'
import { useProject } from '~/providers/project-context'


const AllCategory = () => {
    const { categories } = useCategory()
    return (
        <Card className="rounded-lg border-none mt-6">
            <CardContent className="p-6">
                <div className="flex flex-col gap-4 min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]  ">
                    {
                        categories && categories.map((cat) => (
                            <Card className="h-fit w-full relative" key={cat.id}>
                                <ActionDropDown projectId={''} />
                                <CardHeader>
                                    <CardTitle className="flex gap-2 items-center ">
                                        {cat.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{cat.projects.length} Project</p>
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
