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
            <div className="w-full min-w-0 overflow-x-hidden px-1 sm:px-0">
                <Toaster position="top-center" />
                <Card className='border-transparent lg:border-2 lg:border-zinc-300  m-0 sm:m-4 md:m-6 lg:m-10 overflow-hidden'>
                    <div className='bg-gradient-to-b from-[#0D091E] to-[#54239B] p-4 sm:p-5 md:p-6 rounded-2xl m-2 sm:m-5'>
                        <h2 className='text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold'>Documents</h2>
                        <p className='text-zinc-400 text-sm sm:text-base md:text-lg'>Access company documents and resources</p>
                    </div>
                    <div className='px-3 sm:px-6 md:px-10 pb-4'>
                      <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='border border-zinc-300 p-4 sm:p-5 md:p-6 rounded-xl lg:rounded-2xl placeholder:text-zinc-500 bg-zinc-100 w-full'
                        placeholder='Search documents...'
                      />
                    </div>

                    <Card className='mx-3 sm:mx-6 md:mx-10 mb-6 border border-zinc-300 rounded-2xl overflow-x-auto'>
                      <div className="min-w-[520px]">
                        <Table>
                          <TableHeader>
                            <TableRow className='text-zinc-400'>
                              <TableHead className='text-sm sm:text-base md:text-lg'>Document Name</TableHead>
                              <TableHead className='text-sm sm:text-base md:text-lg'>Type</TableHead>
                              <TableHead className='text-sm sm:text-base md:text-lg'>Owner</TableHead>
                              <TableHead className='text-sm sm:text-base md:text-lg'>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className='text-sm sm:text-base text-zinc-600'>
                            {filteredDocs.map((item) => (
                              <TableRow key={item.id} className='border-b border-zinc-200'>
                                <TableCell className='py-3 sm:py-4'>
                                  <div className='flex items-center gap-3 min-w-0'>
                                    <LucideFileText className='bg-purple-300 h-8 w-8 rounded-xl shrink-0 p-1' />
                                    <div className="truncate">{item.name}</div>
                                  </div>
                                </TableCell>
                                <TableCell className='py-3 sm:py-4'>{item?.type}</TableCell>
                                <TableCell className='py-3 sm:py-4'>HR Department</TableCell>
                                <TableCell className='py-3 sm:py-4'>
                                  <div className='flex items-center gap-2'>
                                    <Button
                                      onClick={() => viewDocument(item.file_path)}
                                      className="h-9 w-9 p-0"
                                      aria-label="View document"
                                    >
                                      <LucideEye className='w-4 h-4' />
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        shareDocument(item.file_path)
                                        toast("Link is copied", {
                                          position: 'top-center',
                                          action: {
                                            label: "Undo",
                                            onClick: () => console.log("Undo"),
                                          },
                                        })
                                      }}
                                      className="h-9 w-9 p-0"
                                      aria-label="Share document"
                                    >
                                      <LucideShare className='w-4 h-4'/>
                                    </Button>
                                    <Button
                                      onClick={() => downloadDocument(item.file_path, `${item.name}.pdf`)}
                                      className="h-9 w-9 p-0"
                                      aria-label="Download document"
                                    >
                                      <LucideDownload className='w-4 h-4' />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </Card>
                </Card>
            </div>
        </>
    )
}

export default Documents
