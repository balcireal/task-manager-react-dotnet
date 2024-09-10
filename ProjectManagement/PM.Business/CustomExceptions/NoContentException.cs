﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Business.CustomExceptions
{
    public class NoContentException : Exception
    {
        public NoContentException(string message)
            : base(message)
        {

        }
    }
}
