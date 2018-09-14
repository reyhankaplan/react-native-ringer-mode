using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Ringer.Mode.RNRingerMode
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNRingerModeModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNRingerModeModule"/>.
        /// </summary>
        internal RNRingerModeModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNRingerMode";
            }
        }
    }
}
