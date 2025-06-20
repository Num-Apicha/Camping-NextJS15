'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const ShareButton = ({
  landmarkId,
  name,
}: {
  landmarkId: string;
  name: string;
}) => {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/landmark/${landmarkId}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-full gap-x-2 items-center"
        side="top"
        align="end"
      >
        <FacebookShareButton url={shareLink} name={name}>
          <FacebookIcon size="28px" />
        </FacebookShareButton>
        <TwitterShareButton url={shareLink} name={name}>
          <TwitterIcon size="28px" />
        </TwitterShareButton>
      </PopoverContent>
    </Popover>
  );
};
export default ShareButton;
