'use client';
import React, { useEffect, useState } from 'react';
import { Card} from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { useSelector } from "react-redux";
import { useAppDispatch, } from "@/app/hooks";
import { RootState } from "@/store";
import { fetchdocs } from '@/slices/documentSlice';
import { Button } from '@/components/ui/button';
import { LucideDownload, LucideEye, LucideFileText, LucideShare} from 'lucide-react';
import { viewDocument, downloadDocument, shareDocument } from '@/lib/constants';
import { toast, Toaster } from "sonner";



const Documents = () => {
    const dispatch = useAppDispatch();

    const { docs, error } = useSelector(
        (state: RootState) => state.docs
    );

    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        dispatch(fetchdocs());
    }, []);

    const filteredDocs = docs.filter((doc) => {
        const query = search.toLowerCase();
    
        return (
          doc.name?.toLowerCase().includes(query)
        );
      })


    return (
        <>
            <div>
                <Toaster position="top-center" />
                <Card className='border-2 border-zinc-300 m-10'>
                    <div className='bg-gradient-to-b  from-[#0D091E] to-[#54239B] p-5 rounded-2xl m-5'>
                        <h2 className='text-white text-4xl font-bold '>Documents</h2>
                        <p className='text-zinc-400 text-lg'>Access company documents and resources</p>
                    </div>
                    <div className='m-25 mt-0 mb-0'><Input value={search} onChange={(e) => setSearch(e.target.value)} className='border border-zinc-300 p-8  rounded-2xl placeholder:text-zinc-500 bg-zinc-100' placeholder='search...' /></div>
                    <Card className='m-25 mt-5 border border-zinc-300  rounded-2xl'>
                        <Table>
                            <TableHeader>
                                <TableRow className='text-zinc-400'>
                                    <TableHead className='text-xl'>Document Name</TableHead>
                                    <TableHead className='text-xl'>Type</TableHead>
                                    <TableHead className='text-xl'>Owner</TableHead>
                                    <TableHead className='text-xl'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='mt-10 ms-10'>
                                {filteredDocs.map((item, id) =>
                                    <>
                                        <TableRow key={item.id} className='border-b-0 ms-20'>
                                            <TableCell className='mt-10 ms-50'>
                                                <div className='flex gap-5 text-md'>
                                                    <div>
                                                        <LucideFileText className='bg-purple-300 h-8 w-8 rounded-xl' />
                                                    </div>
                                                    <div>{item.name}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className='text-md'>{item?.type}</TableCell>
                                            <TableCell className='text-md'>HR Department</TableCell>
                                            <div className='flex mt-10 text-xl'>
                                                <Button onClick={() => { viewDocument(item.file_path) }}><LucideEye className='w-20 h-20' /></Button>
                                                <Button onClick={() => {
                                                    shareDocument(item.file_path)
                                                    toast("Link is copied", {
                                                        position: 'top-center',
                                                        action: {
                                                            label: "Undo",
                                                            onClick: () => console.log("Undo"),
                                                        },
                                                    })
                                                }} ><LucideShare /></Button>
                                                <Button onClick={() => downloadDocument(item.file_path, `${item.name}.pdf`)}><LucideDownload /></Button>
                                            </div>
                                        </TableRow>
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </Card>
                </Card>
            </div>
        </>
    )
}

export default Documents
